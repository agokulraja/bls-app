const Users = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = 'jdhgr546ew87fws6efew687fgg682$%$#%$&VGVH';
const { Op } = require('sequelize');



const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(users);
  } catch (err) {
    console.error('Error fetching all users:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = generateToken(user);

    const { password: _, ...userData } = user.dataValues;
    res.json({ ...userData, token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(`Error fetching user with ID ${id}:`, err);
    res.status(500).json({ error: 'Database error' });
  }
};

const createUser = async (req, res) => {
  const role = "user";
  const { userName, email, mobileNumber, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await Users.create({ userName, email, mobileNumber, role, password: hashedPassword });
    
    const token = generateToken(newUser);

    const { password: _, ...userData } = newUser.dataValues;
    res.status(201).json({ ...userData, token });
  } catch (err) {
    console.error('Error creating a new user:', err);
    res.status(500).json({ error: 'Database error' });
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params;
  const { userName, email, mobileNumber } = req.body;
  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.userName = userName;
    user.email = email;
    user.mobileNumber = mobileNumber;
    await user.save();

    const { password: _, ...userData } = user.dataValues;
    res.json(userData);
  } catch (err) {
    console.error(`Error updating user with ID ${id}:`, err);
    res.status(500).json({ error: 'Database error' });
  }
};


const getUsersByDate = async (req, res) => {
  const { fromDate, toDate } = req.query;

  if (!fromDate || !toDate) {
    return res.status(400).json({ error: "Both 'fromDate' and 'toDate' are required" });
  }

  try {
    const whereClause = {
      createdAt: {
        [Op.between]: [new Date(fromDate), new Date(toDate)],
      },
    };

    const users = await Users.findAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
};





const updateStatusUser = async (req, res) => {
 
  const { id } = req.params;
  const { status } = req.body;
  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.status = status;
    await user.save();

    return res.status(201).json({ error: 'User Permission is updated' });
  } catch (err) {
    console.error(`Error updating user with ID ${id}:`, err);
    res.status(500).json({ error: 'Database error' });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(`Error deleting user with ID ${id}:`, err);
    res.status(500).json({ error: 'Database error' });
  }
};

const changeUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const validRoles = ['admin', 'superadmin', 'user'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: `Invalid role. Valid roles are: ${validRoles.join(', ')}` });
  }

  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.role = role;
    await user.save();

    const { password: _, ...userData } = user.dataValues;
    res.json({ message: 'Role updated successfully', user: userData });
  } catch (err) {
    console.error(`Error changing role for user with ID ${id}:`, err);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser, 
  changeUserRole, 
  updateStatusUser,
  getUsersByDate,
  loginUser,
};

