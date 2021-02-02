const mongoose = require('mongoose')

const shema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    banner: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    scores: { 
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number }
    },
    skills: [{
        icon: { type: String },
        delay: { type: String },
        cost: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String }
    }],
    item1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 顺风出装
    item2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],  // 逆风出装
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }]
})


module.exports = mongoose.model('Hero', shema, 'heroes')

