import { useState } from 'react';
import type { JobFieldDef } from '../../blueprints/registry';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Toggle } from '../ui/toggle';
import { cn } from '../../utils';

interface FormFieldProps {
  field: JobFieldDef;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
  error?: string;
}

export function FormField({ field, value, onChange, error }: FormFieldProps) {
  if (field.internal) return null;

  const isBool = field.type === 'boolean';

  return (
    <div className={cn(isBool && 'flex items-center gap-3')}>
      {!isBool && (
        <label className="block text-sm font-display font-medium text-bp-elements-textSecondary mb-2">
          {field.label}
          {field.required && ' *'}
        </label>
      )}
      <FieldInput field={field} value={value} onChange={onChange} />
      {isBool && (
        <span className="text-sm font-display text-bp-elements-textSecondary">{field.label}</span>
      )}
      {field.helperText && !error && (
        <p className="text-xs text-bp-elements-textTertiary mt-1">{field.helperText}</p>
      )}
      {error && <p className="text-xs text-crimson-400 mt-1">{error}</p>}
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: JobFieldDef;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
}) {
  switch (field.type) {
    case 'text':
      return (
        <Input
          value={String(value ?? '')}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
        />
      );
    case 'number':
      return <NumberInput field={field} value={value} onChange={onChange} />;
    case 'textarea':
    case 'json':
      return (
        <Textarea
          value={String(value ?? '')}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          rows={field.type === 'json' ? 3 : 4}
          className={field.type === 'json' ? 'font-data text-sm' : undefined}
        />
      );
    case 'boolean':
      return <Toggle checked={Boolean(value)} onChange={(v) => onChange(field.name, v)} />;
    case 'select':
      return (
        <Select
          value={String(value ?? '')}
          onValueChange={(v) => onChange(field.name, v)}
          options={field.options ?? []}
        />
      );
    case 'combobox':
      return <ComboboxInput field={field} value={value} onChange={onChange} />;
    default:
      return null;
  }
}

/** Number input with inline stepper buttons */
function NumberInput({
  field,
  value,
  onChange,
}: {
  field: JobFieldDef;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
}) {
  const numVal = Number(value ?? field.min ?? 0);
  const step = field.step ?? 1;

  const clamp = (raw: number) => {
    if (field.min != null && raw < field.min) return field.min;
    if (field.max != null && raw > field.max) return field.max;
    return raw;
  };

  const canDecrement = field.min == null || numVal > field.min;
  const canIncrement = field.max == null || numVal < field.max;

  return (
    <div className="flex items-stretch h-11 rounded-lg border border-bp-elements-borderColor bg-bp-elements-background-depth-3 dark:bg-bp-elements-background-depth-4 transition-all duration-200 hover:border-bp-elements-borderColorActive/40 focus-within:border-violet-500/40 focus-within:ring-2 focus-within:ring-violet-500/10">
      <button
        type="button"
        tabIndex={-1}
        disabled={!canDecrement}
        onClick={() => onChange(field.name, clamp(numVal - step))}
        className="flex items-center justify-center w-10 shrink-0 text-bp-elements-textTertiary transition-colors hover:text-bp-elements-textPrimary hover:bg-white/[0.04] rounded-l-lg disabled:opacity-30 disabled:pointer-events-none"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
      <input
        type="number"
        value={numVal}
        min={field.min}
        max={field.max}
        step={step}
        onChange={(e) => {
          if (e.target.value === '') {
            onChange(field.name, field.min ?? 0);
            return;
          }
          onChange(field.name, clamp(Number(e.target.value)));
        }}
        placeholder={field.placeholder}
        className="flex-1 min-w-0 bg-transparent text-center text-base font-data text-bp-elements-textPrimary outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        tabIndex={-1}
        disabled={!canIncrement}
        onClick={() => onChange(field.name, clamp(numVal + step))}
        className="flex items-center justify-center w-10 shrink-0 text-bp-elements-textTertiary transition-colors hover:text-bp-elements-textPrimary hover:bg-white/[0.04] rounded-r-lg disabled:opacity-30 disabled:pointer-events-none"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
    </div>
  );
}

/** Dropdown with preset options + free-text custom input */
function ComboboxInput({
  field,
  value,
  onChange,
}: {
  field: JobFieldDef;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
}) {
  const strVal = String(value ?? '');
  const options = field.options ?? [];
  const isPreset = options.some((o) => o.value === strVal);
  const [isCustom, setIsCustom] = useState(!isPreset && strVal !== '');

  if (isCustom) {
    return (
      <div className="flex gap-2">
        <Input
          value={strVal}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          className="flex-1"
        />
        <button
          type="button"
          onClick={() => {
            setIsCustom(false);
            onChange(field.name, options[0]?.value ?? '');
          }}
          className="shrink-0 rounded-lg border border-bp-elements-borderColor bg-bp-elements-background-depth-3 px-3 py-2 text-xs font-display text-bp-elements-textTertiary transition-colors hover:border-bp-elements-borderColorActive/40 hover:text-bp-elements-textSecondary"
        >
          Presets
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 w-full">
      <Select
        value={strVal}
        onValueChange={(v) => {
          if (v === '__custom__') {
            setIsCustom(true);
            onChange(field.name, '');
          } else {
            onChange(field.name, v);
          }
        }}
        options={[...options, { label: 'Custom...', value: '__custom__' }]}
        className="flex-1"
      />
    </div>
  );
}
