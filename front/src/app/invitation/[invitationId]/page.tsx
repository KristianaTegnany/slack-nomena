"use client"

import useCheckAuthNoRedirection from "@/hooks/useCheckAuthNoRedirection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
import { useCallback } from "react";
import { getSession, registerUser, saveSession } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { acceptInvitation } from "@/lib/invitation";

export default function InvitationPage() {
  const router = useRouter()
  const { invitationId } = useParams() as { invitationId: string }
  const [toLogged, setToLogged] = useState<boolean>()
  const isLogged = useCheckAuthNoRedirection()

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

  const onEmailPassRegister = useCallback((e) => {
    e.preventDefault()
    const { email, password } = form.getValues()
    registerUser(email, password).then(res => {
      if (res.statusCode !== 500) {
        saveSession({...res.user, name: res.user.email.split('@')[0]})
        window.location.reload()
      }
    })
  }, [form])

  const onAccept = useCallback(() => {
    const user = getSession()!
    acceptInvitation(invitationId, user.uid).then(res => {
      if (res) {
        router.push(`/workspace/${res.workspaceId}`)
      }
    })
  }, [toLogged])

  useEffect(() => {
    setToLogged(Boolean(isLogged))
  }, [isLogged])

  return (
    <div className="min-h-screen p-5 grid text-center place-content-center">
      {
        toLogged === undefined ? <div>Laoding...</div> : (
          isLogged ?
            <div className="flex items-center gap-x-4">
              <div className='max-w-[460px]'>
                <Typography
                  text='Accept the invitation'
                  variant='h2'
                  className='mb-3'
                />

                <Typography
                  text='By accepting this invitation you will join a Slack Clone workspace'
                  variant='p'
                  className='opacity-90 mb-7'
                />
                <Button
                  variant='secondary'
                  className=' bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white flex space-x-3 py-6'
                  onClick={onAccept}
                >
                  <Typography text='Continue' variant='p' />
                </Button>
              </div>
            </div>
            : <div className='min-h-screen p-5 grid text-center place-content-center bg-white'>
              <div className='max-w-[460px]'>
                <div className='flex justify-center items-center gap-3 mb-4'>
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
                          variant='secondary'
                          className=' bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white flex space-x-3 py-6'
                          onClick={onEmailPassRegister}
                        >
                          <Typography text='Continue' variant='p' />
                        </Button>
                      </fieldset>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
        )
      }
    </div>
  );
}