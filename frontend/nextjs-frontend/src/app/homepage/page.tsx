"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from "../../../utils/axios.ts";
import AuthenticatedRoute from "../../components/AuthenticatedRoute.tsx";
import axios from "axios";
import RestaurantItem from '../../components/RestaurantItems.tsx';
// Define Restaurant type

interface ItemProps {
  id: number;
  name: string;
  address: string;
  rating: number
}
interface displaySuccessMessageProps {
  show: boolean;
  type: string | null;
}
const HomePage: React.FC = () => {
  // State to track the selected restaurant
  const [restaurant, setRestaurant] = useState([]);
  const router = useRouter();
  const params = useSearchParams();
  const [displaySuccessMessage, setDisplaySuccessMessage] =
    useState<displaySuccessMessageProps>({
      show: false,
      type: "",
    });
  useEffect(() => {
    axiosInstance
      .get("http://127.0.0.1:8000/restaurant/")
      .then((res) => setRestaurant(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!!params.get("action")) {
      setDisplaySuccessMessage({
        type: params.get("action"),
        show: true,
      });
      router.replace("/homepage");
    }
  }, [params, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (displaySuccessMessage.show) {
        setDisplaySuccessMessage({
          show: false,
          type: "",
        });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [displaySuccessMessage.show]);

  const handleDelete = (id: number) => {
    setRestaurant((items) => items.filter((item: ItemProps) => item.id !== id));
  };
  async function logout(refreshToken: string) {
    axios.post("http://127.0.0.1:8000/logout/", {
      refresh: refreshToken,
    });
    localStorage.removeItem("accessToken");
    router.push("/login");
  }
  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      logout(refreshToken);
    }
    return null;
  };
  return (
    <AuthenticatedRoute>
      <div className="homepage">
        <div className='header'>
          <h1 className='heading'>Choose a Restaurant</h1>
          <button className="add-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="restaurant-list-1">
          {restaurant.map((item: ItemProps) => (
            <RestaurantItem id={item.id} name={item.name} address={item.address} rating={item.rating} onClick={() => router.push(`/restaurant/${item.id}`)} />
          ))}
        </div>
      </div>

    </AuthenticatedRoute>
  );
};

export default HomePage;

