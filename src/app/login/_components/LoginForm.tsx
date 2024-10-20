'use client'

import { z } from 'zod'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { signInAction } from '@/app/actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const schema = z.object({
  email: z.string().email({ message: 'อีเมลไม่ถูกต้อง' }),
  password: z
    .string()
    .min(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }),
})

type FormInput = z.infer<typeof schema>

function PasswordInput({
  error,
  register,
}: {
  error?: string
  register: UseFormRegisterReturn
}) {
  const [isShow, setIsShow] = useState(false)
  return (
    <Input
      register={register}
      errorClassName='relative top-1'
      error={error}
      placeholder='รหัสผ่าน'
      type={isShow ? 'text' : 'password'}
      endIcon={
        <Icon
          onClick={() => setIsShow(!isShow)}
          name={isShow ? 'visibility_off' : 'visibility'}
          className='text-field-gray cursor-pointer'
        />
      }
    />
  )
}

export default function LoginForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  function onSubmit(formData: FormInput) {
    startTransition(async () => {
      const err = await signInAction({
        email: formData.email,
        password: formData.password,
      })

      if (err) {
        toast.error('ไม่สามารถเข้าสู่ระบบได้')

        return
      }
      toast.success('เข้าสู่ระบบสำเร็จ')
      router.push('/')
      router.refresh()
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 rounded-lg shadow-lg p-4'>
      <div className='flex flex-col gap-1'>
        <span>
          อีเมล <span className='text-error'>*</span>
        </span>
        <Input
          errorClassName='relative top-1'
          error={errors.email?.message}
          placeholder='อีเมล'
          register={register('email')}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <span>
          รหัสผ่าน <span className='text-error'>*</span>
        </span>
        <PasswordInput
          error={errors.password?.message}
          register={register('password')}
        />
      </div>
      <Button loading={isPending} disabled={isPending}>
        เข้าสู่ระบบ
      </Button>
      <Button
        type='button'
        onClick={() => {
          startTransition(() => {
            router.push('/register')
          })
        }}
        outlined
        loading={isPending}
        disabled={isPending}>
        สมัครสมาชิก
      </Button>
    </form>
  )
}
