"use client"
import { BsApple } from "react-icons/bs";
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineAutoAwesome } from 'react-icons/md';
import Image from 'next/image'
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSession, saveSession, signInWithEmail, signInWithGoogle } from "@/lib/auth";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
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

  useEffect(() => {
    const user = getSession()
    if (user) {
      router.push('/workspace')
    }
  }, [])

  const onGoogleSign = async () => {
    const res = await signInWithGoogle()
    if (res?.user) {
      console.log({ res })
      saveSession(res.user)
      router.push('/workspace')
    }
  }

  const onEmailPassSign = useCallback(async (e) => {
    e.preventDefault()
    const { email, password } = form.getValues()
    console.log({ email, password })
    if (email.length && password.length) {
      const res = await signInWithEmail(email, password)
      if (res) {
        console.log({ res })
        saveSession(res.user)
        router.push('/workspace')
      }
    }
  }, [form])

  return (
    <div className='min-h-screen p-5 grid text-center place-content-center bg-white'>
      <div className='max-w-[460px]'>
        <div className='flex justify-center items-center gap-3 mb-4'>
          <Image
            src="slack.svg"
            width={25}
            height={25}
            alt="Slack logo"
          />
          <Typography text='Slack Clone' variant='h3' />
        </div>

        <Typography
          text='Sign in to your Slack clone account'
          variant='h2'
          className='mb-3'
        />

        <Typography
          text='We suggest using the email address you use at work'
          variant='p'
          className='opacity-90 mb-7'
        />

        <div className='flex flex-col space-y-4'>
          <Button
            variant='outline'
            className='py-6 border-2 flex space-x-3'
            onClick={onGoogleSign}
          >
            <FcGoogle size={20} />
            <Typography
              className='text-xl'
              text='Sign in with Google'
              variant='p'
            />
          </Button>
          <Button
            variant='outline'
            className='py-6 border-2 flex space-x-3'
          >
            <BsApple size={20} />
            <Typography
              className='text-xl'
              text='Sign in with Apple'
              variant='p'
            />
          </Button>
        </div>

        <div>
          <div className='flex items-center my-6'>
            <div className='mr-[10px] flex-1 border-t bg-neutral-300' />
            <Typography text='OR' variant='p' />
            <div className='ml-[10px] flex-1 border-t bg-neutral-300' />
          </div>

          <Form {...form}>
            <form>
              <fieldset>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder='name@work-email.com' {...field}
                        />
                      </FormControl>
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
                  onClick={onEmailPassSign}
                  variant='secondary'
                  className=' bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white flex space-x-3 py-6'
                >
                  <MdOutlineMailOutline size={20} />
                  <Typography text='Sign in with Email' variant='p' />
                </Button>

                <div className='px-5 py-4 bg-gray-100 rounded-sm'>
                  <div className='text-gray-500 flex items-start space-x-3'>
                    <MdOutlineAutoAwesome size={20} />
                    <div>
                      <a href="/register" >New to Slack ?<span className=' text-blue-800 hover:underline'> Create an Account</span></a>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

