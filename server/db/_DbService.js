class _DBService{
    constructor(model){
        this.model = model;
    }

    getAll(){
        return this.model.find();
    }

    get(filter){
        return this.model.findOne(filter);
    }

    async add(datas){
        let new_object = new this.model(datas);
        await new_object.save();
        return new_object;
    }

    async update(filter, new_datas){
        let updatedObject = await this.model.updateOne(filter, new_datas);
        return updatedObject;
    }

    async delete(filter){
        let deletedObject = await this.model.deleteOne(filter);
        return deletedObject;
    }
}

module.exports = _DBService