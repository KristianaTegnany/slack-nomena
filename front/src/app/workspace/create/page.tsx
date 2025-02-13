"use client";
import React, { useCallback } from 'react';
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
import useCheckAuth from '@/hooks/useCheckAuth';
import { createOrUpdateWorkspace, WorkSpaceType } from '@/lib/workspaces';
import { useRouter } from 'next/navigation';



const JoinWorkspacePage = () => {

  const formSchema = z.object({
    workspaceName: z.string().min(2, { message: 'Workspace name must be at least 2 characters' }),
  });

  const user = useCheckAuth()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceName: '',
    },
  });

  const handleCreateWorkspace = useCallback(async (e) => {
    e.preventDefault()
    const { workspaceName } = form.getValues()
    if (workspaceName.length) {
      const newWorkspace = {
        userid: user.uid,
        name: workspaceName
      } as WorkSpaceType
      const res = await createOrUpdateWorkspace(newWorkspace)
      console.log({ res })
      if (res && res.id) {
        router.push(`/workspace/${res.id}`)
      }
    } else {
      alert();
    }
  }, [form, user]);

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
          text='Create new workspace'
          variant='h2'
          className='mb-3'
        />
      </div>
      <Form {...form}>
        <form >
          <fieldset>
            <FormField
              control={form.control}
              name='workspaceName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Workspace name...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={handleCreateWorkspace}
              variant='secondary'
              className=' bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white flex space-x-3 py-6'
              type='submit'
            >
              <Typography text='Create Workspace' variant='p' />
            </Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};

export default JoinWorkspacePage;
