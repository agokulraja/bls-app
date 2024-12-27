const { FormData } = require('../models');  

const updateForm = async (req, res) => {
  const { id } = req.params;  
  const updatedData = req.body; 

  try {
    const [updated] = await FormData.update(updatedData, {
      where: { applicationId: id },  
      returning: true,  
    });

    if (updated) {
      const updatedForm = await FormData.findOne({ where: { id: id } });
      res.status(200).json(updatedForm);  
    } else {
      res.status(404).json({ message: 'Form not found' });
    }
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { updateForm };
