module.exports = (mongoose) => {
  const templeSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      description: String,
      location: String,
    },
    { 
      timestamps: true,
      collection: 'temples'
    }
  );

  const Temple = mongoose.model('Temple', templeSchema);

  return Temple;
};
