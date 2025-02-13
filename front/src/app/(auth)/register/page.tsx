"use client"
import { BsApple } from "react-icons/bs";
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image'
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from "react";
import { registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";


const Register = () => {
  const router = useRouter()
  const formSchema = z.object({
    email: z.string().email().min(2, { message: 'Email must be 2 characters' }),
    password: z.string().min(8, { message: 'Email must be 2 characters' })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '', password: ''
    },
  });

  const [loading, setLoading] = useState(false)
  
  const onEmailPassRegister = useCallback((e: any) => {
    e.preventDefault()
    setLoading(true)
    const {email, password} = form.getValues()
    registerUser(email, password).then(res => {
      if(typeof res !== "string") {
        if(res.statusCode !== 500) {
          console.log({res})
          router.push('login')
        }
      }
    }).finally(() => setLoading(false))
  }, [form])

  return (
    <div className='min-h-screen p-5 grid text-center place-content-center bg-white'>
      <div className='max-w-[460px]'>
        <div className='flex justify-center items-center gap-3 mb-4'>
          <Image
            src="/slack.png"
            width={25}
            height={25}
            alt="Slack logo"
          />
          <Typography text='Slack Clone' variant='h3' />
        </div>

        <Typography
          text='First, enter your email'
          variant='h2'
          className='mb-3'
        />

        <Typography
          text='We suggest using the email address you use at work'
          variant='p'
          className='opacity-90 mb-7'
        />

        <div>
          <Form {...form}>
            <form >
              <fieldset>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='name@work-email.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder='password' type="password" {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  disabled={loading}
                  variant='secondary'
                  className=' bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white flex space-x-3 py-6'
                  onClick={onEmailPassRegister}
                >
                  <Typography text='Continue' variant='p' />
                </Button>
              </fieldset>
            </form>
          </Form>
          <div className='flex items-center my-4'>
            <div className='mr-[10px] flex-1 border-t bg-neutral-300' />
            <Typography text='OR' variant='p' />
            <div className='ml-[10px] flex-1 border-t bg-neutral-300' />
          </div>
        </div>
      </div>
      <div className='px-5 py-4 my-6'>
        <div className='text-gray-500 flex items-start space-x-3 '>
          <Typography
            text='Already using Slack?'
            variant='p'
          />
          <a href="/login" className=' text-blue-800 hover:underline'>Sign in to an existing workspace</a>
        </div>
      </div>
    </div>
  );
};

export default Register;

