'use client'

import toast, { Toaster, ToastBar } from 'react-hot-toast'

export default function Toast() {
  return (
    <Toaster
      toastOptions={{
        icon: <span></span>,
        style: {
          borderRadius: '24px',
          border: 'solid 1px',
          boxShadow: 'none',
        },
        success: {
          style: {
            borderColor: '#19C788',
            background: '#DFF1EB',
            color: '#19C788',
          },
        },
        error: {
          style: {
            borderColor: '#DE6B4F',
            background: '#FCE6E1',
            color: '#DE6B4F',
          },
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <button
                  className="mr-2 flex items-center text-2xs"
                  onClick={() => toast.dismiss(t.id)}
                >
                  X
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}
