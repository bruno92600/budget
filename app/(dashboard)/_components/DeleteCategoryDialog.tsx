"use client"

import { Category } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { DeleteCategory } from '../_actions/categories'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { TransactionType } from '@/lib/types'

interface Props {
    trigger: ReactNode
    category: Category
}

function DeleteCategoryDialog({ category, trigger }: Props) {

    const categoryIdentifier = `${category.name}-${category.type}`

    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: DeleteCategory,
        onSuccess: async () => {
            toast.success("Categorie supprimer avec succès", {
                id: categoryIdentifier,
            })

            await queryClient.invalidateQueries({
                queryKey: ["categories"],
            })
        },

        onError: () => {
            toast.error("Erreur lors de la suppression", {
                id: categoryIdentifier,
            })
        }
    })

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                Etes-vous absolument sûr
                </AlertDialogTitle>
                <AlertDialogDescription>
                Cette action ne peut pas être annulée. Cela supprimera définitivement votre catégorie
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                    toast.loading("Suppression de la catégorie...", {
                        id: categoryIdentifier,
                    })
                    deleteMutation.mutate({
                        name: category.name,
                        type: category.type as TransactionType,
                    })
                }}>Continuer</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteCategoryDialog