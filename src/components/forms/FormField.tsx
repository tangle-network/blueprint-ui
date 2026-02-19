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
      return (
        <Input
          type="number"
          value={value as number}
          min={field.min}
          max={field.max}
          step={field.step}
          onChange={(e) => {
            const raw = Number(e.target.value);
            const clamped =
              field.min != null && raw < field.min ? field.min :
              field.max != null && raw > field.max ? field.max :
              raw;
            onChange(field.name, clamped);
          }}
          placeholder={field.placeholder}
        />
      );
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
          onChange={(e) => onChange(field.name, e.target.value)}
          options={field.options ?? []}
        />
      );
    case 'combobox':
      return <ComboboxInput field={field} value={value} onChange={onChange} />;
    default:
      return null;
  }
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
          className="text-xs text-bp-elements-textTertiary hover:text-bp-elements-textSecondary px-2"
        >
          Presets
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Select
        value={strVal}
        onChange={(e) => {
          if (e.target.value === '__custom__') {
            setIsCustom(true);
            onChange(field.name, '');
          } else {
            onChange(field.name, e.target.value);
          }
        }}
        options={[...options, { label: 'Custom...', value: '__custom__' }]}
      />
    </div>
  );
}
