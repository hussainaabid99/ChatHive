class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }

  async getAll() {
    try {
      const result = await this.model.find({});
      return result;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }

  async getById(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const result = await this.model.findByIdAndUpdate(id, data);
      return result;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }

  async destroy(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }

  async findOne(data) {
    try {
      const result = await this.model.findOne(data);
      return result;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }

  async deleteMany(data) {
    try {
      const result = await this.model.deleteMany(data);
      return result;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }
}

export default CrudRepository;
