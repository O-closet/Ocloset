const {Schema} = require("mongoose")
const shortId = require("./type/short-id")

module.exports = new Schema({
    shortId,
    title: String,
    content: String,
    // 옷장:1, OOTD:2, 당근마켓:3 
    postType: {
        type: Number,
        max: 3,
        required: true
    },
    // url: 이미지 주소, category: [top, bottom, shoes]
    img: {
        url: String,
        category: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
}
);