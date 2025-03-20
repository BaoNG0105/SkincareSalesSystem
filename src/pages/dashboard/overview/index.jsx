import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from 'recharts';
import { getProduct } from '../../../services/api.product';
import { getUsers } from '../../../services/api.user';

function OverviewPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProduct();
        const users = await getUsers();

        console.log('Users:', users);

        const staffCount = users.filter(user => user.role === 'Staff').length;
        const managerCount = users.filter(user => user.role === 'Manager').length;
        const customerCount = users.filter(user => user.role === 'Customer').length;

        setData([
          { name: 'Products', value: products.length },
          { name: 'Staff', value: staffCount },
          { name: 'Managers', value: managerCount },
          { name: 'Customers', value: customerCount },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="flex justify-center items-center h-full">
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}

export default OverviewPage;