import ReactDOM from 'react-dom'
import { useState, forwardRef, useImperativeHandle } from 'react'
import { uuid } from '../../shared'
import { Toast } from '..'
import styles from './styles.module.css'
import { useToastPortal, useToastAutoClose } from '../../hooks'

export const ToastPortal = forwardRef(
  ({ autoClose = false, autoCloseTime = 5000 }, ref) => {
    const [toasts, setToasts] = useState([])
    const { loaded, portalId } = useToastPortal()

    useToastAutoClose({
      toasts,
      setToasts,
      autoClose,
      autoCloseTime,
    })

    const removeToast = (id) => {
      setToasts(toasts.filter((t) => t.id !== id))
    }

    useImperativeHandle(ref, () => ({
      addMessage(toast) {
        setToasts([...toasts, { ...toast, id: uuid() }])
      },
    }))

    return loaded ? (
      ReactDOM.createPortal(
        <div className={styles.toastContainer}>
          {toasts.map((t) => (
            <Toast
              key={t.id}
              mode={t.mode}
              message={t.message}
              onClose={() => removeToast(t.id)}
            />
          ))}
        </div>,

        document.getElementById(portalId)
      )
    ) : (
      <></>
    )
  }
)
