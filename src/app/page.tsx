'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const userSChema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  lastName: z.string({
    required_error: 'Last name is required',
  }),
  age: z
    .string({
      required_error: 'Age is required',
    })
    .transform((val) => parseInt(val)),
  status: z.enum(['single', 'married', 'divorced', 'widowed']),
})

type UserType = z.infer<typeof userSChema>

const statusOptions = ['single', 'married', 'divorced', 'widowed']

function HomePage() {
  const form = useForm<UserType>({
    resolver: zodResolver(userSChema),
    defaultValues: {
      name: '',
      lastName: '',
      age: 0,
      status: 'single',
    },
  })

  const onSubmit = form.handleSubmit((values: UserType) => {
    console.log(values)
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new user</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='flex flex-col gap-y-2' onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is a description of the field above
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='age'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is a description of the field above
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Civil Status <span className='text-red-500'>*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your{' '}
                    <Link href='/examples/forms'>email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default HomePage
//00:38:05
