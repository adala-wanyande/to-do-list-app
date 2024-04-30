"use client"

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';


const supabase = createClient();

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendOTP = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({ phone: `+${phone}` });
    if (error) {
      setError('Error sending OTP: ' + error.message);
      console.error(error);
    } else {
      setError('');
      // Automatically open dialog after successful OTP send
    }
  };

  const handleVerifyOTP = async () => {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: `+${phone}`,
      token: otp,
      type: 'sms',
    });
    if (error) {
      setError('Error verifying OTP: ' + error.message);
      console.error(error);
    } else {
      setError('');
      console.log('OTP verification success:', data);
      // Additional actions post-verification
      router.push('/');
    }
  };

  return (
    <div className='w-full flex flex-col justify-between space-y-8'>
      <h1 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mx-auto mt-32'>Login</h1>
      <p className='text-center text-sm text-muted-foreground mx-8'>Kindly enter your phone number to login with an OTP. Once logged in you can begin adding to-dos. </p>
      <input
        type="tel"
        placeholder="37258927971"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className='mx-auto text-center border-0 focus-visible:outline-none'
      />
      <Dialog>
        <DialogTrigger asChild>
          <button className='bg-primary w-32 p-4 mx-auto rounded' onClick={handleSendOTP}>Send OTP</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Your Phone Number</DialogTitle>
            <DialogDescription>
              Please enter the OTP sent to your phone.
            </DialogDescription>
          </DialogHeader>
          <input
            className='m-8 p-2 rounded focus-visible:outline-none'
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className='mx-auto bg-black rounded text-white p-3' onClick={handleVerifyOTP}>Verify OTP</button>
          {error && <p className="max-w-xs error p-8 text-center text-red-500">{error}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
