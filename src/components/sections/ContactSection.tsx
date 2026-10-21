'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  ArrowUpRight,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { SiteSettings } from '@/types/portfolio';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { formatWhatsAppLink } from '@/lib/utils';

interface ContactSectionProps {
  settings: SiteSettings;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // Honeypot anti-spam field (must remain empty)
  const [honeypot, setHoneypot] = useState('');

  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setStatus('error');
      setErrorMessage('Nama lengkap minimal 2 karakter.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus('error');
      setErrorMessage('Masukkan alamat email yang valid.');
      return;
    }

    if (trimmedMessage.length < 10) {
      setStatus('error');
      setErrorMessage('Pesan minimal 10 karakter agar kebutuhan proyek jelas.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          website_url: honeypot, // Honeypot
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data.error || t.contact.form.errorGeneric);
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setErrorMessage(t.contact.form.errorGeneric);
    }
  };

  const whatsappHref = formatWhatsAppLink(
    settings.whatsapp || '+6281298765432',
    'Halo Ray, saya tertarik mendiskusikan proyek desain / branding / video bersama studio Anda.'
  );

  return (
    <section
      id="kontak"
      aria-labelledby="heading-kontak"
      className="py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[var(--line)]">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-editorial italic text-sm text-[var(--brass)]">
                {t.contact.index}
              </span>
              <span className="h-[1px] w-10 bg-[var(--line)]" />
              <span className="label-editorial">{t.contact.label}</span>
            </div>

            <h2
              id="heading-kontak"
              className="section-heading font-normal text-[var(--ivory)]"
            >
              {t.contact.heading}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>
        </div>

        {/* Content Grid: Left Channels (5 cols), Right Form (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
          {/* Direct Contact Channels */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              <h3 className="label-editorial text-[var(--brass-light)]">
                {t.contact.directChannels}
              </h3>

              {/* Email Card */}
              <a
                href={`mailto:${settings.email}`}
                className="group flex items-center justify-between border border-[var(--line)] bg-[#131316] p-5 hover:border-[var(--brass)] transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--line)] bg-[#0A0A0B] text-[var(--brass)]">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <span className="label-editorial block text-[10px]">
                      Email Studio
                    </span>
                    <span className="font-editorial text-xl sm:text-2xl text-[var(--ivory)] truncate block group-hover:text-[var(--brass-light)] transition-colors">
                      {settings.email}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--brass)]" />
              </a>

              {/* WhatsApp Card */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-[var(--line)] bg-[#131316] p-5 hover:border-[var(--brass)] transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--line)] bg-[#0A0A0B] text-[var(--brass)]">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <span className="label-editorial block text-[10px]">
                      WhatsApp Langsung
                    </span>
                    <span className="font-editorial text-xl sm:text-2xl text-[var(--ivory)] truncate block group-hover:text-[var(--brass-light)] transition-colors">
                      {settings.whatsapp}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--brass)]" />
              </a>
            </div>

            {/* Social / Portfolio Network Links */}
            <div className="border-t border-[var(--line)] pt-6">
              <span className="label-editorial block mb-4 text-[10px]">
                Jejaring &amp; Portofolio Eksternal
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {settings.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between min-h-[44px] border border-[var(--line)] bg-[#131316] px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-[var(--ivory)] hover:border-[var(--brass)] hover:text-[var(--brass-light)] transition-colors"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[var(--brass)]" />
                  </a>
                )}
                {settings.linkedin && (
                  <a
                    href={settings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between min-h-[44px] border border-[var(--line)] bg-[#131316] px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-[var(--ivory)] hover:border-[var(--brass)] hover:text-[var(--brass-light)] transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[var(--brass)]" />
                  </a>
                )}
                {settings.behance && (
                  <a
                    href={settings.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between min-h-[44px] border border-[var(--line)] bg-[#131316] px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-[var(--ivory)] hover:border-[var(--brass)] hover:text-[var(--brass-light)] transition-colors"
                  >
                    <span>Behance</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[var(--brass)]" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="border border-[var(--line)] bg-[#131316] p-6 sm:p-10 space-y-6"
            >
              {/* Hidden Honeypot Input for Bot/Spam Protection */}
              <div
                aria-hidden="true"
                className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none"
              >
                <label htmlFor="website_url">Website</label>
                <input
                  id="website_url"
                  name="website_url"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="label-editorial block mb-2 text-[var(--ivory)]"
                  >
                    {t.contact.form.nameLabel} *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contact.form.namePlaceholder}
                    className="w-full min-h-[48px] border border-[var(--line)] bg-[#0A0A0B] px-4 py-3 text-sm text-[var(--ivory)] placeholder:text-[var(--muted)]/60 focus:border-[var(--brass)] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="label-editorial block mb-2 text-[var(--ivory)]"
                  >
                    {t.contact.form.emailLabel} *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.contact.form.emailPlaceholder}
                    className="w-full min-h-[48px] border border-[var(--line)] bg-[#0A0A0B] px-4 py-3 text-sm text-[var(--ivory)] placeholder:text-[var(--muted)]/60 focus:border-[var(--brass)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="label-editorial block mb-2 text-[var(--ivory)]"
                >
                  {t.contact.form.messageLabel} *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.contact.form.messagePlaceholder}
                  className="w-full border border-[var(--line)] bg-[#0A0A0B] px-4 py-3 text-sm text-[var(--ivory)] placeholder:text-[var(--muted)]/60 focus:border-[var(--brass)] focus:outline-none transition-colors resize-y"
                />
              </div>

              {status === 'error' && (
                <div
                  role="alert"
                  className="flex items-center gap-3 border border-red-500/40 bg-red-950/30 px-4 py-3 text-xs text-red-200"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === 'success' && (
                <div
                  role="status"
                  className="flex items-start gap-3 border border-emerald-500/40 bg-emerald-950/25 px-4 py-4 text-xs text-emerald-100"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <p className="font-medium uppercase tracking-[0.15em] text-emerald-300">
                      {t.contact.form.successTitle}
                    </p>
                    <p className="mt-1 text-[var(--ivory)]/80">
                      {t.contact.form.successDesc}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <span className="text-xs text-[var(--muted)]">
                  * Wajib diisi. Dilindungi filter anti-spam otomatis.
                </span>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-3 min-h-[48px] bg-[var(--brass)] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] disabled:opacity-50 transition-colors"
                >
                  <span>
                    {status === 'submitting'
                      ? t.contact.form.submitting
                      : t.contact.form.submit}
                  </span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
