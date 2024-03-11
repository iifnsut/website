const mongoose = require('mongoose');
const sequence = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// Define collection and schema for Event
let Event = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    location: {
        type: String
    },
    image: {
        type: String
    },
    type: {
        type: String
    },
    event_link: {
        type: String
    },
    venue: {
        type: String
    },
    form : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Form',
    }
},{
    timestamps: true
});

Event.post("findOneAndDelete", async function(event) {
    console.log("Deleting form", event.form);
    if(event.form) {
        await mongoose.model("Form").findOneAndDelete({_id: event.form});
    }
    });    

Event.plugin(sequence, {
    inc_field: 'eventId',
    start_seq: 1000
});


module.exports = mongoose.model('Event', Event);
