'use client'

import { z } from 'zod'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { phoneRegex } from '@/lib/const'

const schema = z
  .object({
    userName: z
      .string()
      .min(4, { message: 'ชื่อสมาชิก / อีเมลต้องมีอย่างน้อย 4 ตัวอักษร' }),
    password: z
      .string()
      .min(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }),
    tel: z.string().regex(phoneRegex, { message: 'เบอร์โทรศัพท์ไม่ถูกต้อง' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'รหัสผ่านไม่ตรงกัน',
    path: ['confirmPassword'],
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
          name='remove_red_eye'
          className='text-field-gray cursor-pointer'
        />
      }
    />
  )
}

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  function onSubmit(data: FormInput) {
    console.log('submit: ', data)
  }
  console.log('errors: ', errors)

  return (
    <form
      className='flex flex-col gap-4 rounded-lg shadow-lg p-4'
      onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-1'>
        <span>
          เบอร์โทรศัพท์ <span className='text-error'>*</span>
        </span>
        <Input
          type='tel'
          error={errors.tel?.message}
          errorClassName='relative top-1'
          placeholder='เบอร์โทรศัพท์'
          register={register('tel')}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <span>
          ชื่อสมาชิก / อีเมล <span className='text-error'>*</span>
        </span>
        <Input
          errorClassName='relative top-1'
          error={errors.userName?.message}
          placeholder='ชื่อสมาชิก / อีเมล'
          register={register('userName')}
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
      <div className='flex flex-col gap-1'>
        <span>
          ยืนยันรหัสผ่าน <span className='text-error'>*</span>
        </span>
        <PasswordInput
          error={errors.confirmPassword?.message}
          register={register('confirmPassword')}
        />
      </div>
      <Button>สมัครสมาชิก</Button>
    </form>
  )
}
