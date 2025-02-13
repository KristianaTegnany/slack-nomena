"use client";
import React from 'react';
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



const JoinWorkspacePage = () => {

  const formSchema = z.object({
      workspaceCode: z.string().min(2, { message: 'Workspace code must be at least 2 characters' }),
    });
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        workspaceCode: '',
      },
    });

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
          text='Enter Workspace Code'
          variant='h2'
          className='mb-3'
        />
      </div>
      <Form {...form}>
            <form >
              <fieldset>  
                <FormField
                  control={form.control}
                  name='workspaceCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Workspace code...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant='secondary'
                  className=' bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white flex space-x-3 py-6'
                  type='submit'
                >
                  <Typography text='Join workspace' variant='p' />
                </Button>
              </fieldset>
            </form>
          </Form>
    </div>
  );
};

export default JoinWorkspacePage;
