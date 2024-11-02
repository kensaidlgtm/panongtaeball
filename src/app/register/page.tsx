import RegisterForm from './_components/RegisterForm'

export default async function RegisterPage() {
  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-128px)] p-6'>
      <RegisterForm />
    </div>
  )
}
