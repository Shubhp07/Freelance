import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, Leaf, ShieldCheck, ArrowLeft } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────
type Step = 'details' | 'otp';

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// ─── OTP Input Component ─────────────────────────────────
const OtpInput = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (otp: string[]) => void;
}) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;          // digits only
    const next = [...value];
    next[index] = val;
    onChange(next);
    if (val && index < 5) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    const next = Array(6).fill('');
    digits.forEach((d, i) => (next[i] = d));
    onChange(next);
    refs.current[Math.min(digits.length, 5)]?.focus();
  };

  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {value.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-12 h-12 text-center text-xl font-bold border-2 rounded-xl
            border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200
            focus:outline-none transition text-gray-800"
        />
      ))}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────
const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('details');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [resendTimer, setResendTimer] = useState(30);
  const [errors, setErrors] = useState<Partial<FormData & { otp: string }>>({});

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // Resend countdown
  useEffect(() => {
    if (step !== 'otp') return;
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  // ── Validators ─────────────────────────────────────────
  const validateDetails = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone) e.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit number';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Step 1: Send OTP ────────────────────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDetails()) return;
    setLoading(true);
    // TODO: Replace with your actual "send OTP" API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setStep('otp');
  };

  // ── Step 2: Verify OTP ──────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered.length < 6) {
      setErrors({ otp: 'Please enter the complete 6-digit OTP' });
      return;
    }
    setErrors({});
    setLoading(true);
    // TODO: Replace with your actual "verify OTP + register" API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    navigate('/');
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(Array(6).fill(''));
    // TODO: Re-trigger OTP API
    setResendTimer(30);
  };

  // ── Field helper ────────────────────────────────────────
  const field = (
    id: keyof FormData,
    label: string,
    type: string,
    placeholder: string,
    Icon: React.ElementType,
    extra?: React.ReactNode
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type={type}
          placeholder={placeholder}
          value={form[id]}
          onChange={(e) => setForm({ ...form, [id]: e.target.value })}
          className={`w-full pl-10 pr-${extra ? '10' : '4'} py-3 rounded-xl border ${
            errors[id] ? 'border-red-400 bg-red-50' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 transition`}
        />
        {extra}
      </div>
      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
    </div>
  );

  // ─── Slide variants ─────────────────────────────────────
  const slideVariants = {
    enter: { x: 60, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -60, opacity: 0 },
  };

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 py-10">
    <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 overflow-hidden"
      >
        {/* Brand */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-3">
            <Leaf className="w-7 h-7 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {step === 'details' ? 'Create Account' : 'Verify Your Number'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {step === 'details'
              ? 'Join us for fresh deliveries'
              : `OTP sent to +91 ${form.phone}`}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2 mb-8">
          {['Details', 'Verify'].map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  (i === 0 && step === 'details') || (i === 1 && step === 'otp')
                    ? 'bg-green-600 text-white'
                    : i === 0 && step === 'otp'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i === 0 && step === 'otp' ? '✓' : i + 1}
              </div>
              <span
                className={`text-xs font-medium ${
                  (i === 0 && step === 'details') || (i === 1 && step === 'otp')
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              >
                {label}
              </span>
              {i === 0 && (
                <div
                  className={`flex-1 h-0.5 rounded ${
                    step === 'otp' ? 'bg-green-400' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── STEP 1: Details Form ── */}
        <AnimatePresence mode="wait">
          {step === 'details' && (
            <motion.form
              key="details"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              onSubmit={handleSendOtp}
              className="space-y-4"
            >
              {field('name', 'Full Name', 'text', 'John Doe', User)}
              {field('email', 'Email Address', 'email', 'you@example.com', Mail)}
              {field('phone', 'Phone Number', 'tel', '10-digit mobile number', Phone)}

              {/* Password with toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                      errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 transition`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                      errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 transition`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300
                  text-white font-semibold py-3 rounded-xl transition-colors text-base
                  flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </motion.button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </motion.form>
          )}

          {/* ── STEP 2: OTP Verification ── */}
          {step === 'otp' && (
            <motion.form
              key="otp"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              onSubmit={handleVerifyOtp}
              className="space-y-6"
            >
              <div className="bg-green-50 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">
                  Enter the 6-digit OTP sent to your phone number. It expires in{' '}
                  <span className="font-semibold">10 minutes</span>.
                </p>
              </div>

              <OtpInput value={otp} onChange={setOtp} />

              {errors.otp && (
                <p className="text-red-500 text-xs text-center">{errors.otp}</p>
              )}

              {/* Resend */}
              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend OTP in{' '}
                    <span className="font-semibold text-gray-700">{resendTimer}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-sm text-green-600 hover:text-green-700 font-semibold"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300
                  text-white font-semibold py-3 rounded-xl transition-colors text-base
                  flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Create Account'
                )}
              </motion.button>

              <button
                type="button"
                onClick={() => setStep('details')}
                className="w-full flex items-center justify-center gap-2 text-sm text-gray-500
                  hover:text-gray-700 font-medium transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to details
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Signup;
