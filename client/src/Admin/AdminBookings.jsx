
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate(); 
    useEffect(() => {
        fetchBookings();
        
    }, []);

    const fetchBookings = () => {
        axios.get('/adminBookings')
            .then((res) => {
                setBookings(res.data);
                
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
            });
            
    };

    async function handleLogout() {
        await axios.post('/adminLogout');
        navigate('/');
    }

    function Users(){
        navigate('/admin')
    }
    function Venues(){
        navigate('/admin/adminvenues');
    }

    async function handleDeleteBookings(id) {
        try {
            await axios.delete(`/adminBookings/${id}`);
            setBookings(bookings.filter(booking => booking._id !== id)); // Update the state after deletion
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    }

    return (
        <div className="container">
            <h1 className='font-bold text-5xl'>ADMIN DASHBOARD</h1>

            <button onClick={handleLogout} className='btn btn-primary mt-3'style={{ width: '200px'}}>
                Logout
            </button>

            <button onClick={Users} className='btn btn-primary mt-3 ml-3'style={{ width: '200px'}}>Users</button>
            <button onClick={Venues} className='btn btn-primary mt-3 ml-3'style={{ width: '200px'}}>Venues</button>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <h2 className='font-bold text-3xl'>Bookings</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead>
                        <th scope="col" className="p-4 font-bold text-black">#</th>
                        <th scope="col" className="p-4 font-bold text-black">Owner ID</th>
                        <th scope="col" className="px-6 py-3 font-bold text-black">User ID</th>
                        <th scope="col" className="px-6 py-3 font-bold text-black">Venue ID</th>
                        <th scope="col" className="px-6 py-3 font-bold text-black">Price</th>
                        <th scope="col" className="px-6 py-3 font-bold text-black">Title</th>                         <th scope="col" className="px-6 py-3 font-bold text-black">Category</th>
                        <th scope="col" className="px-6 py-3 font-bold text-black">BookingDayDate</th>
                        <th scope="col" className="px-6 py-3 font-bold text-black">BookingNightDate</th>
                        <th scope="col" className="px-6 py-3 font-bold text-black">Approval</th>
                        <th scope="col" className="px-6 py-3 font-bold text-black">Delete</th>
                        <th scope="col" className="px-6 py-3 font-bold text-black">Edit</th>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking._id}>
                                <td className="w-4 p-4 font-bold text-black">{index + 1}</td>
                                    <td className="px-6 py-4 font-bold text-black">{booking.ownerId}</td>
                                    <td className="px-6 py-4 font-bold text-black">{booking.userId}</td>
                                    <td className="px-6 py-4 font-bold text-black">{booking.venueId}</td>
                                    <td className="px-6 py-4 font-bold text-black">{booking.Price}</td>
                                    <td className="px-6 py-4 font-bold text-black">{booking.title}</td>
                                    <td className="px-6 py-4 font-bold text-black">{booking.category}</td>
                                    <td className="px-6 py-4 font-bold text-black">{booking.bookingDayDate}</td>
                                    <td className="px-6 py-4 font-bold text-black">{booking.bookingNightDate}</td>
                                    <td className="px-6 py-4 font-bold text-black">{booking.approval==true ? "True":"False"}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDeleteBookings(booking._id)} className='btn btn-danger'>Delete</button>
                                </td>
                                <td>
                                    <button className='btn btn-primary'>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminBookings;
