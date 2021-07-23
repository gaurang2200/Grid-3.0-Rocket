'use strict'
import mongoose from 'mongoose'

class CRUD {
  constructor(collection, schema) {
    this.mongoModel = new mongoose.model(collection, schema)

    const { list } = this.mongoModel
    this.list = list
  }

  
}

export default CRUD