const mongose = require('mongoose');
const Schema = mongose.Schema;

const issueSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['low','medium', 'high'],
        required: true
    },
    status: {
        type: String,
        enum: ['open','close']
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true}
}, { timestamps: true});

module.exports = mongose.model('Issue', issueSchema );


