'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
  FileDown,
  Info,
} from 'lucide-react';
import { SiteSettings } from '@/types/portfolio';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { formatWhatsAppLink } from '@/lib/utils';

interface ContactSectionProps {
  settings: SiteSettings;
  isStandalonePage?: boolean;
}

export function ContactSection({
  settings,
  isStandalonePage = false,
}: ContactSectionProps) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'fallback' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const contactEmail = settings.email || 'rayraharja09@gmail.com';
  const contactWhatsapp = settings.whatsapp || '+62 813-8145-7516';

  const buildPrefilledMailto = () => {
    const subject = encodeURIComponent(
      `Portfolio Inquiry - ${name.trim() || 'Prospective Collaborator'}`
    );
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    );
    return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setStatus('error');
      setErrorMessage(t.contact.form.errorName);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus('error');
      setErrorMessage(t.contact.form.errorEmail);
      return;
    }

    if (trimmedMessage.length < 10) {
      setStatus('error');
      setErrorMessage(t.contact.form.errorMessage);
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
          website_url: honeypot,
        }),
      });

      const data = await response.json();

      if (response.status === 503 || data?.code === 'STORAGE_UNAVAILABLE') {
        setStatus('fallback');
        return;
      }

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data?.error || t.contact.form.errorGeneric);
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
    contactWhatsapp,
    t.contact.whatsappPrefill
  );

  const HeadingTag = isStandalonePage ? 'h1' : 'h2';

  return (
    <section
      id="kontak"
      aria-labelledby="heading-kontak"
      className={
        isStandalonePage
          ? 'pt-28 sm:pt-36 pb-20 sm:pb-28'
          : 'py-20 sm:py-28 scroll-mt-20'
      }
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[var(--line)]">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-editorial italic text-sm text-[var(--brass-light)]">
                {t.contact.index}
              </span>
              <span className="h-[1px] w-10 bg-[var(--line)]" />
              <span className="label-editorial">{t.contact.label}</span>
            </div>

            <HeadingTag
              id="heading-kontak"
              className="section-heading font-normal text-[var(--ivory)]"
            >
              {t.contact.heading}
            </HeadingTag>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-5">
              <h2 className="label-editorial text-[var(--brass-light)]">
                {t.contact.directChannels}
              </h2>

              {/* Direct Email Card */}
              <a
                href={`mailto:${contactEmail}`}
                className="group flex items-center justify-between border border-[var(--border-control)] bg-[#131316] p-5 hover:border-[var(--brass-light)] transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--line)] bg-[#0A0A0B] text-[var(--brass-light)]">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <span className="label-editorial block text-[10px]">
                      {t.contact.emailCardLabel}
                    </span>
                    <span className="font-editorial text-xl sm:text-2xl text-[var(--ivory)] truncate block group-hover:text-[var(--brass-light)] transition-colors">
                      {contactEmail}
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-[var(--brass-light)]" />
              </a>

              {/* Direct WhatsApp Card */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-[var(--border-control)] bg-[#131316] p-5 hover:border-[var(--brass-light)] transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--line)] bg-[#0A0A0B] text-[var(--brass-light)]">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <span className="label-editorial block text-[10px]">
                      {t.contact.whatsappCardLabel}
                    </span>
                    <span className="font-editorial text-xl sm:text-2xl text-[var(--ivory)] truncate block group-hover:text-[var(--brass-light)] transition-colors">
                      {contactWhatsapp}
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-[var(--brass-light)]" />
              </a>
            </div>

            {/* Verified Profiles & CV Download */}
            <div className="border-t border-[var(--line)] pt-6">
              <span className="label-editorial block mb-4 text-[10px]">
                {t.contact.networkLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {settings.linkedin && (
                  <a
                    href={settings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between min-h-[44px] border border-[var(--border-control)] bg-[#131316] px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[var(--brass-light)]" />
                  </a>
                )}
                {settings.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between min-h-[44px] border border-[var(--border-control)] bg-[#131316] px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
                  >
                    <span>Instagram (@Reyp.u)</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[var(--brass-light)]" />
                  </a>
                )}
                {settings.cv_url && (
                  <a
                    href={settings.cv_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="sm:col-span-2 flex items-center justify-between min-h-[44px] border border-[var(--brass)]/70 bg-[#1B160C] px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-[var(--brass-light)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors"
                  >
                    <span>{t.contact.cvLinkLabel}</span>
                    <FileDown className="h-3.5 w-3.5 shrink-0" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Validated Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
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
                    className="w-full min-h-[48px] border border-[var(--border-control)] bg-[#0A0A0B] px-4 py-3 text-sm text-[var(--ivory)] placeholder:text-[var(--muted)] focus:border-[var(--brass-light)] focus:outline-none transition-colors"
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
                    className="w-full min-h-[48px] border border-[var(--border-control)] bg-[#0A0A0B] px-4 py-3 text-sm text-[var(--ivory)] placeholder:text-[var(--muted)] focus:border-[var(--brass-light)] focus:outline-none transition-colors"
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
                  className="w-full border border-[var(--border-control)] bg-[#0A0A0B] px-4 py-3 text-sm text-[var(--ivory)] placeholder:text-[var(--muted)] focus:border-[var(--brass-light)] focus:outline-none transition-colors resize-y"
                />
              </div>

              {status === 'error' && (
                <div
                  role="alert"
                  className="flex items-center gap-3 border border-red-500/50 bg-red-950/35 px-4 py-3.5 text-xs text-red-200"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === 'fallback' && (
                <div
                  role="status"
                  className="border border-amber-500/60 bg-[#241B09] p-5 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <Info className="h-4 w-4 shrink-0 text-amber-300 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-amber-200">
                        {t.contact.fallbackNoticeTitle}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--ivory)]/90 leading-relaxed">
                        {t.contact.fallbackNoticeDesc}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pl-7">
                    <a
                      href={buildPrefilledMailto()}
                      className="inline-flex items-center gap-2 min-h-[44px] bg-[var(--brass)] px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>{t.contact.openMailClientCta}</span>
                    </a>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 min-h-[44px] border border-[var(--border-control)] bg-[#0A0A0B] px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-[var(--brass-light)]" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {status === 'success' && (
                <div
                  role="status"
                  className="flex items-start gap-3 border border-[#2E7D52] bg-[#0A2618] px-4 py-4 text-xs text-[#86EFAC]"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#86EFAC] mt-0.5" />
                  <div>
                    <p className="font-medium uppercase tracking-[0.15em]">
                      {t.contact.form.successTitle}
                    </p>
                    <p className="mt-1 text-[var(--ivory)]/90">
                      {t.contact.form.successDesc}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <span className="text-xs text-[var(--muted)]">
                  {t.contact.form.requiredNote}
                </span>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-3 min-h-[48px] bg-[var(--brass)] px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] disabled:opacity-50 transition-colors shrink-0"
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
