"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";  // Import axios

const usePagePermission = (pageId) => {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No token found");
      router.push("/login");
      return;
    }

    const checkAccess = async () => {
      if (!storedUserId) return;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/page-permissions/permissions/check`,
          {
            params: {
              userId: storedUserId,
              pageId: pageId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        if (response.status === 200) {
          setHasAccess(true);
        } else if (response.status === 403) {
          // router.push("/unauthorized");
        } else {
          console.error("Unexpected response", response.data);
        }
      } catch (error) {
        console.error("Error checking access", error);
        // router.push("/error");
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [pageId, router]);

  return { hasAccess, isLoading, userId };
};

export default usePagePermission;
