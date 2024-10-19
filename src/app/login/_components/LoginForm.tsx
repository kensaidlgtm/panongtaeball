'use client'

import { z } from 'zod'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState, useState } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
// import { authenticate } from '@/app/lib/actions'
import { useFormStatus } from 'react-dom'
import { signInAction } from '@/app/actions'

const schema = z.object({
  userName: z
    .string()
    .min(4, { message: 'ชื่อสมาชิก / อีเมลต้องมีอย่างน้อย 4 ตัวอักษร' }),
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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })
  // authenticate
  // const [errorMessage, dispatch] = useActionState(signInAction, undefined)
  const { pending } = useFormStatus()

  function onSubmit(data: FormInput) {
    console.log('submit: ', data)
  }
  console.log('errors: ', errors)
  console.log('pending: ', pending)
  // console.log('errorMessage: ', errorMessage)
  return (
    // onSubmit={handleSubmit(onSubmit)}
    <form
      action={signInAction}
      className='flex flex-col gap-4 rounded-lg shadow-lg p-4'>
      <div className='flex flex-col gap-1'>
        <span>
          ชื่อสมาชิก / อีเมล <span className='text-error'>*</span>
        </span>
        <Input
          // name='userNamee'
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
      {/* {errorMessage && <span className='text-error'>{errorMessage}</span>} */}
      <Button>เข้าสู่ระบบ</Button>
    </form>
  )
}
