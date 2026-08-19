import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { container } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--navy)] text-white pt-24 pb-8 mt-auto max-[900px]:pt-[72px] max-[900px]:pb-6" id="contact">
      <div className={cn(container, 'grid grid-cols-[1.4fr_repeat(3,1fr)] gap-12 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:gap-8')}>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-white no-underline font-extrabold text-[1.15rem]"
          >
            <span
              className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-[var(--accent-sky)] to-[var(--accent-mint)] grid place-items-center"
              aria-hidden="true"
            >
              <HeartPulse size={18} />
            </span>
            MediConnect
          </Link>
          <p className="mt-4 text-[#cbd5e1] max-w-[320px] leading-[1.7]">
            A trusted healthcare platform for discovering verified doctors and
            booking appointments that fit your schedule.
          </p>
          <div className="flex gap-2.5 mt-6">
            <a
              href="https://facebook.com"
              aria-label="MediConnect on Facebook"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.12)] grid place-items-center text-[#e2e8f0] transition-[background-color,color] duration-150 hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://instagram.com"
              aria-label="MediConnect on Instagram"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.12)] grid place-items-center text-[#e2e8f0] transition-[background-color,color] duration-150 hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="MediConnect on LinkedIn"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.12)] grid place-items-center text-[#e2e8f0] transition-[background-color,color] duration-150 hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-[var(--text-sm)] uppercase tracking-[0.08em] mb-4 text-[#e2e8f0]">
            Platform
          </h2>
          <ul className="list-none grid gap-2.5 [&_a]:text-[#cbd5e1] [&_a]:no-underline [&_a]:text-[var(--text-sm)] [&_a]:transition-colors [&_a]:duration-150 hover:[&_a]:text-white">
            <li>
              <Link to="/doctors">Find Doctors</Link>
            </li>
            <li>
              <Link to="/booking">Appointments</Link>
            </li>
            <li>
              <Link to="/login">Patient Portal</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[var(--text-sm)] uppercase tracking-[0.08em] mb-4 text-[#e2e8f0]">
            Company
          </h2>
          <ul className="list-none grid gap-2.5 [&_a]:text-[#cbd5e1] [&_a]:no-underline [&_a]:text-[var(--text-sm)] [&_a]:transition-colors [&_a]:duration-150 hover:[&_a]:text-white">
            <li>
              <Link to="/#about">About</Link>
            </li>
            <li>
              <Link to="/#how-it-works">How It Works</Link>
            </li>
            <li>
              <Link to="/#contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[var(--text-sm)] uppercase tracking-[0.08em] mb-4 text-[#e2e8f0]">
            Support
          </h2>
          <ul className="list-none grid gap-2.5 [&_a]:text-[#cbd5e1] [&_a]:no-underline [&_a]:text-[var(--text-sm)] [&_a]:transition-colors [&_a]:duration-150 hover:[&_a]:text-white">
            <li>
              <Link to="/#contact">Help Center</Link>
            </li>
            <li>
              <Link to="/#contact">Privacy</Link>
            </li>
            <li>
              <Link to="/#contact">Terms</Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={cn(
          container,
          'mt-12 pt-6 border-t border-[rgba(255,255,255,0.1)] text-[#94a3b8] text-[var(--text-sm)] flex justify-between gap-4 flex-wrap',
        )}
      >
        <p>&copy; {year} MediConnect. All rights reserved.</p>
        <p>Smart healthcare appointment & patient portal</p>
      </div>
    </footer>
  );
};

export default Footer;
