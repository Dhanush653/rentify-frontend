import type { UpdateProfileRequest } from '@/types/user'

export interface ProfileFormProps {
  defaultValues?: Partial<UpdateProfileRequest>
  onSubmit: (values: UpdateProfileRequest) => void
  isSubmitting?: boolean
}

const ProfileForm = (_props: ProfileFormProps) => (
  <form className="flex flex-col gap-4">
    {/* TODO: wire up react-hook-form + zodResolver and render the fields. */}
    <p className="text-sm text-gray-500">ProfileForm</p>
  </form>
)

export default ProfileForm
