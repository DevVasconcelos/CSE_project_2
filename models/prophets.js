module.exports = (mongoose) => {
  const prophetSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      birthDate: String,
      birthPlace: String,
      callingDate: String,
      age: Number,
      numberOfTemplesDedicated: Number,
      biography: String,
    },
    { 
      timestamps: true,
      collection: 'prophets'
    }
  );

  const Prophet = mongoose.model('Prophet', prophetSchema);

  return Prophet;
};
