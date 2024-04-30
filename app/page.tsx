"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import Home from '@/components/Home';

const supabase = createClient();

const ProtectedPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user) {
      // Redirect to login if there is no user
      router.push('/login');
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return <Home />;
}

export default ProtectedPage;
