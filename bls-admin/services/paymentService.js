import axios from 'axios';

export const fetchPaymentsData = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/payments`); 
    return response.data;
    
  } catch (error) {
    console.error('Error fetching payments data:', error);
    throw error;
  }
};
