"use client"

import React from 'react'
import { Button } from './ui/button'

export function CorporateHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full max-w-[1440px] mx-auto h-[129px] px-6 flex items-center justify-between">
        {/* Logo/Branding */}
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold text-sl-purple">
            Split Lease
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/corporate-pages"
              className="text-sm font-medium text-sl-text hover:text-sl-purple transition-colors"
            >
              Corporate Pages
            </a>
            <a
              href="/unit-tests"
              className="text-sm font-medium text-sl-text hover:text-sl-purple transition-colors"
            >
              Unit Tests
            </a>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="purple"
            size="default"
            onClick={() => {
              // Navigate to change prices page or open modal
              window.location.href = '/change-prices'
            }}
          >
            Change Prices
          </Button>
        </div>
      </div>
    </header>
  )
}
