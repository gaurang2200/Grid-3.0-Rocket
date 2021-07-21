'use strict'
import mongoose from 'mongoose'

class CRUD {
    constructor(collection, schema) {
        this.mongoModel = new mongoose.model(collection, schema)

        const { list } = this.mongoModel
        this.list = list
    }

    /* CREATE */
    async create(item) {
        return this.mongoModel.create(item)
    }

    /* READ */
    async findById(id) {
        return this.mongoModel.findById(id)
    }
}

export default CRUD