'use client';

import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const FormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  measurements: z.string().min(1),
  style: z.string().min(1),
  color: z.string().min(1),
  notes: z.string().optional()
});

type FormValues = z.infer<typeof FormSchema>;

export default function CustomOrderForm() {
  const {register, handleSubmit, reset, formState: {errors}} = useForm<FormValues>({
    resolver: zodResolver(FormSchema)
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    alert('upload non implémenté');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" aria-label="Formulaire sur-mesure">
      <div>
        <label htmlFor="name" className="mb-1 block">Nom</label>
        <input id="name" {...register('name')} className="w-full rounded border p-2" />
        {errors.name && <p className="text-sm text-red-600">Nom requis</p>}
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block">Email</label>
        <input id="email" type="email" {...register('email')} className="w-full rounded border p-2" />
        {errors.email && <p className="text-sm text-red-600">Email invalide</p>}
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block">Téléphone</label>
        <input id="phone" {...register('phone')} className="w-full rounded border p-2" />
        {errors.phone && <p className="text-sm text-red-600">Téléphone requis</p>}
      </div>
      <div>
        <label htmlFor="measurements" className="mb-1 block">Mensurations</label>
        <input id="measurements" {...register('measurements')} className="w-full rounded border p-2" />
        {errors.measurements && <p className="text-sm text-red-600">Mensurations requises</p>}
      </div>
      <div>
        <label htmlFor="style" className="mb-1 block">Style</label>
        <input id="style" {...register('style')} className="w-full rounded border p-2" />
        {errors.style && <p className="text-sm text-red-600">Style requis</p>}
      </div>
      <div>
        <label htmlFor="color" className="mb-1 block">Couleur</label>
        <input id="color" {...register('color')} className="w-full rounded border p-2" />
        {errors.color && <p className="text-sm text-red-600">Couleur requise</p>}
      </div>
      <div>
        <label htmlFor="notes" className="mb-1 block">Notes</label>
        <textarea id="notes" {...register('notes')} className="w-full rounded border p-2" />
      </div>
      <button type="submit" className="rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600">
        Envoyer
      </button>
    </form>
  );
}
