const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    issues: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Issue'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);