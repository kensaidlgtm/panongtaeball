'use client'

import { z } from 'zod'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { phoneRegex } from '@/app/lib/const'
import { register as registerUser, signInGoogle } from '@/app/actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Checkbox from '@/components/Checkbox'
import Link from 'next/link'

const schema = z
  .object({
    email: z.string().email({ message: 'อีเมลไม่ถูกต้อง' }),
    password: z
      .string()
      .min(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }),
    name: z
      .string()
      .min(4, { message: 'ชื่อสมาชิกต้องมีอย่างน้อย 4 ตัวอักษร' }),
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
          name={isShow ? 'visibility_off' : 'visibility'}
          className='text-field-gray cursor-pointer'
        />
      }
    />
  )
}

export default function RegisterForm() {
  const [checkedPolicy, setCheckedPolicy] = useState(false)
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

  function onSubmit(data: FormInput) {
    startTransition(async () => {
      const res = await registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
        tel: data.tel,
      })

      if (res.error) {
        if (
          res.error ===
          `duplicate key value violates unique constraint "unique_email_with_null_oauth"`
        ) {
          toast.error('อีเมลซ้ำ')

          return
        }

        toast.error(res.error)

        return
      }

      toast.success('สมัครสมาชิกสำเร็จ')
      router.push('/')
      router.refresh()
    })
  }

  const isWebView = (() => {
    if (typeof window === 'undefined') {
      return true
    }

    return /wv|WebView|; wv|iPhone.*(?!.*Safari)|Android.*(wv|Version\/\d+\.\d+ Chrome)/i.test(
      window?.navigator?.userAgent
    )
  })()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 rounded-lg shadow-lg p-4 scrollbar-sm overflow-auto'>
      <button
        onClick={() => {
          window.location.href =
            'googlechrome://navigate?url=' + window.location.href
        }}>
        login with google
      </button>
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
      <div className='flex flex-col gap-1'>
        <span>
          ยืนยันรหัสผ่าน <span className='text-error'>*</span>
        </span>
        <PasswordInput
          error={errors.confirmPassword?.message}
          register={register('confirmPassword')}
        />
      </div>
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
          ชื่อสมาชิก <span className='text-error'>*</span>
        </span>
        <Input
          errorClassName='relative top-1'
          error={errors.name?.message}
          placeholder='ชื่อสมาชิก'
          register={register('name')}
        />
      </div>
      <div className='flex items-center gap-3'>
        <Checkbox checked={checkedPolicy} onChange={setCheckedPolicy} />
        <span>
          คุณยอมรับ
          <Link className='text-primary underline' href='/privacy-policy'>
            นโยบายความเป็นส่วนตัว
          </Link>
        </span>
      </div>
      <Button loading={isPending} disabled={isPending || !checkedPolicy}>
        สมัครสมาชิก
      </Button>
      {!isWebView && (
        <div
          onClick={async () => {
            const url = await signInGoogle()
            router.push(url)
          }}
          className='flex items-center gap-3 shadow-md text-slate-400 hover:text-secondary cursor-pointer rounded-lg bg-white p-3'>
          <Image src={'/google.png'} width={20} height={20} alt='google' />
          <span className='font-medium'>Continue with Google</span>
        </div>
      )}
    </form>
  )
}
