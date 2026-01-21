"use client"

import React, { useState, useEffect } from 'react'
import { CorporateHeader } from '@/components/corporate-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase } from '@/lib/supabase/client'
import type { PolicyDocument, User, InsertDocumentSent } from '@/types/database'

export default function CreateDocumentPage() {
  // State for form fields
  const [policyDocuments, setPolicyDocuments] = useState<PolicyDocument[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedDocument, setSelectedDocument] = useState<string>('')
  const [documentName, setDocumentName] = useState<string>('')
  const [selectedHost, setSelectedHost] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{
    documentName?: string
    document?: string
    host?: string
  }>({})

  // Load policy documents on mount
  useEffect(() => {
    async function loadPolicyDocuments() {
      const { data, error } = await supabase
        .from('ZAT-Policies Documents')
        .select('*')
        .order('Name', { ascending: true })

      if (error) {
        console.error('Error loading policy documents:', error)
      } else if (data) {
        setPolicyDocuments(data)
      }
    }

    loadPolicyDocuments()
  }, [])

  // Load users on mount
  useEffect(() => {
    async function loadUsers() {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('email', { ascending: true })

      if (error) {
        console.error('Error loading users:', error)
      } else if (data) {
        setUsers(data)
      }
    }

    loadUsers()
  }, [])

  // Hide Crisp chat on page load
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).$crisp) {
      (window as any).$crisp.push(['do', 'chat:hide'])
    }
  }, [])

  // Auto-populate document name when document is selected
  useEffect(() => {
    if (selectedDocument) {
      const doc = policyDocuments.find(d => d.id === selectedDocument)
      if (doc) {
        setDocumentName(doc.Name)
      }
    }
  }, [selectedDocument, policyDocuments])

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}

    if (!selectedDocument) {
      newErrors.document = 'Please select a document'
    }

    if (!documentName.trim()) {
      newErrors.documentName = 'Document name is required'
    }

    if (!selectedHost) {
      newErrors.host = 'Please select a host'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const selectedHostUser = users.find(u => u.id === selectedHost)
      if (!selectedHostUser) {
        throw new Error('Selected host not found')
      }

      const documentSent: InsertDocumentSent = {
        document_on_policies: selectedDocument,
        document_sent_title: documentName.trim(),
        host_user: selectedHost,
        host_email: selectedHostUser.email,
        host_name: selectedHostUser.Name + ' Full',
      }

      const { error } = await supabase
        .from('Documents Sent')
        .insert([documentSent])

      if (error) {
        throw error
      }

      // Success! Clear form
      setSelectedDocument('')
      setDocumentName('')
      setSelectedHost('')
      setErrors({})

      alert('Document created successfully!')
    } catch (error) {
      console.error('Error creating document:', error)
      alert('Failed to create document. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <CorporateHeader />

      {/* Main content with padding for fixed header */}
      <main className="pt-[129px] px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-sl-text mb-8">Create Document</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Document Selector */}
            <div className="space-y-2">
              <Label htmlFor="document-select">Choose document to send</Label>
              <Select
                value={selectedDocument}
                onValueChange={(value) => {
                  setSelectedDocument(value)
                  setErrors({ ...errors, document: undefined })
                }}
              >
                <SelectTrigger
                  id="document-select"
                  className="w-[250px]"
                  error={!!errors.document}
                  variant="aqua"
                >
                  <SelectValue placeholder="Choose document to send" />
                </SelectTrigger>
                <SelectContent>
                  {policyDocuments.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      {doc.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.document && (
                <p className="text-sm text-sl-error">{errors.document}</p>
              )}
            </div>

            {/* Document Name Input */}
            <div className="space-y-2">
              <Label htmlFor="document-name">Document Name</Label>
              <Input
                id="document-name"
                type="text"
                placeholder="Title"
                value={documentName}
                onChange={(e) => {
                  setDocumentName(e.target.value)
                  setErrors({ ...errors, documentName: undefined })
                }}
                error={!!errors.documentName}
                className="w-[250px]"
              />
              {errors.documentName && (
                <p className="text-sm text-sl-error">{errors.documentName}</p>
              )}
            </div>

            {/* Host Selector */}
            <div className="space-y-2">
              <Label htmlFor="host-select">Choose Host</Label>
              <Select
                value={selectedHost}
                onValueChange={(value) => {
                  setSelectedHost(value)
                  setErrors({ ...errors, host: undefined })
                }}
              >
                <SelectTrigger
                  id="host-select"
                  className="w-[250px]"
                  error={!!errors.host}
                  variant="purple"
                >
                  <SelectValue placeholder="Choose Host" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.host && (
                <p className="text-sm text-sl-error">{errors.host}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="purple"
                size="xl"
                disabled={isSubmitting}
                className="w-[231px]"
              >
                {isSubmitting ? 'Creating...' : 'Create Document'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
