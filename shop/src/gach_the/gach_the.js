// biết cách render theo ddataa này ko, config cho dễ á

var TELCO = {
    VIETTEL: {
        ten: "VIETTEL",
        menhGia: [10000,20000,30000,50000,100000,200000,300000,500000,1000000],
        chietKhau: [17.5, 17.5, 18.5, 17.5, 17.5, 17.5, 18.5, 18, 18.5].map(v=>v/100),
    },
    VINAPHONE: {
        ten: "VINAPHONE",
        menhGia: [10000,20000,30000,50000,100000,200000,300000,500000],
        chietKhau: [16.5, 16.5, 16.5, 16.5, 16.5, 16.5, 16.5, 16.5].map(v=>v/100),
    },
    MOBIFONE: {
        ten: "MOBIFONE",
        menhGia: [10000,20000,30000,50000,100000,200000,300000,500000],
        chietKhau: [18, 18, 18, 17, 16.5, 16, 16, 15].map(v=>v/100),
    },
    VNMOBI: {
        ten: "VNMOBI",
        menhGia: [10000,20000,30000,50000,100000,200000,300000,500000],
        chietKhau: [20, 20, 20, 20, 20, 20, 20, 20].map(v=>v/100),
    },
    ZING: {
        ten: "ZING",
        menhGia: [10000,20000,30000,50000,100000,200000,300000,500000,1000000],
        chietKhau: [11, 11, 11, 11, 11, 11, 11, 11, 11].map(v=>v/100),
    },
    GARENA: {
        ten: "GARENA",
        menhGia: [20000,50000,100000,200000,500000],
        chietKhau: [12.5, 12.5, 12.5, 12.5, 12.5].map(v=>v/100),
    },
    VCOIN: {
        ten: "VCOIN",
        menhGia: [10000,20000,50000,100000,200000,300000,500000,1000000,2000000,5000000,10000000],
        chietKhau: [13, 13, 13, 13, 13, 13, 13, 13, 15, 15, 15].map(v=>v/100),
    },
    GATE: {
        ten: "GATE",
        menhGia: [10000,20000,30000,50000,100000,200000,300000,500000,1000000,2000000,5000000,10000000],
        chietKhau: [15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17].map(v=>v/100),
    },
}
var COMMAND = {
    SEND_CARD: "charging",
    CHECK_CARD: "check"
}

const axios = require('axios');
const FormData = require('form-data');
var crypto = require('crypto');
var md5_hash = text=>crypto.createHash('md5').update(text).digest('hex');
var sleep = ms => new Promise(r => setTimeout(r, ms));
var {partner_id, partner_key} = require('./config.js')

async function chargingws(telco, code, serial, amount, request_id, command = COMMAND.SEND_CARD){
    // Chữ ký được mã hóa như sau: md5(partner_key + code + serial)
    const sign = md5_hash(partner_key + code + serial);

    // Gửi thẻ
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    const formdata = new FormData();
    formdata.append("telco", telco);
    formdata.append("code", code);
    formdata.append("serial", serial);
    formdata.append("amount", amount);
    formdata.append("request_id", request_id);
    formdata.append("partner_id", partner_id);
    formdata.append("sign", sign);
    formdata.append("command", command);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://trumthe.vn/chargingws/v2',
        headers: { 
          'Content-Type': 'application/json', 
          ...data.getHeaders()
        },
        data : data
      };

    var response;
    var err;
    // thử lại tối đa 3 lần (lỗi mạng)
    for(let i=0; i<=3; i++){
        try{
            response = (await axios.request(config)).data;
            break;
        }
        catch(e){
            err = e;
            await sleep(i * i * 1000);
        }
    }
    if(!response) throw err;

    // Kết quả trả về có dạng
    // {
    //     "trans_id": 8,
    //     "request_id": "323233",
    //     "amount": 35000,
    //     "value": null,
    //     "declared_value": 50000,
    //     "telco": "VIETTEL",
    //     "serial": "10004783347874",
    //     "code": "312821445892982",
    //     "status": 99,
    //     "message": "PENDING"
    // }


    // Mã lỗi:
    // 1: Thẻ thành công đúng mệnh giá
    // 2: Thẻ thành công sai mệnh giá
    // 3: Thẻ lỗi
    // 4: Hệ thống bảo trì
    // 99: Thẻ chờ xử lý
    // 100: Gửi thẻ thất bại - Có lý do đi kèm ở phần thông báo trả về
    return response;
}

const HisNapThe = require('../app/models/historyNapThe.js');
const USER = require('../app/models/User.js');
function gach_the_callback(req, res, next){
    // {
    //     "status": 1,
    //     "message": "Thành công",
    //     "request_id": "989876",
    //     "declared_value": 50000,
    //     "value": 50000,
    //     "amount": 25000,
    //     "code": "314688440422676",
    //     "serial": "10003395125761",
    //     "telco": "VIETTEL",
    //     "trans_id": 54180,
    //     "callback_sign": "17b118fe86852c52ea126c9537617f6d"
    // }
    
    const data = req.body;
    const {status, message, amount, value} = data;
    const sign = md5_hash(partner_key + data.code + data.serial);

    // test nên khỏi check
    // if(sign != data.callback_sign) throw new Error("mã hash không khớp");

    // Thực hiện lệnh cộng số dư theo data.request_id
    HisNapThe.findOneAndUpdate(
        { $and: [ { request_id: data.request_id }, { status: { $nin: [1, 2] } }] },
        { $set: {status, message, amount, value} },
        { new: true }, // Trả về bản ghi đã cập nhật

        (err, updatedHis) => {
            if (err) {
                console.error("Lỗi khi tìm và cập nhật :", err.message);
                return;
            }

            if (updatedHis){
                // Thành công

                // check xem đã cộng chưa

                //chiết khấu đâu, rồi mà nạp 50 đc có 25 đó, api nó tự ttinhs r
                switch(data.status){
                    case 1:
                    case 2: {
                        // 1: Thẻ thành công đúng mệnh giá
                        // 2: Thẻ thành công sai mệnh giá

                        // cộng số dư data.amount
                        console.log(`${updatedHis.username} vừa nạp ${amount}`);
                        USER.findOneAndUpdate(
                            { username: updatedHis.username },
                            { $inc: { coin: amount } }, // Tăng số dư
                        )
                        .then(()=>{
                            // return res.json({"message": "ok"});
                        })
                        .catch((err)=>{
                            // return next(err);
                        })
                        break;
                    }
                    case 3: break; // 3: Thẻ lỗi
                    case 4: break; // 4: Hệ thống bảo trì
                    case 99: break; // 99: Thẻ chờ xử lý
                    case 100: break; // 100: Gửi thẻ thất bại - Có lý do đi kèm ở phần thông báo trả về
                    default: throw new Error(data.message);
                }
            }
            else{
                console.log("Không tìm thấy his");
            }
        }
    )

    return res.json({"message": "ok"}); // cái này trả về cho server của ngta
}

// async function main(){
//     const telco = TELCO.VIETTEL.ten;
//     const code = "312821445892982";
//     const serial = "10004783347874";
//     const amount = "50000";
//     const request_id = "323233";
//     const command = COMMAND.CHECK_CARD;
//     const r = await chargingws(telco, code, serial, amount, request_id, command);
//     console.log(r);
// }
// main();

module.exports = {
    TELCO, COMMAND,
    chargingws, gach_the_callback
}

// ở đâuu