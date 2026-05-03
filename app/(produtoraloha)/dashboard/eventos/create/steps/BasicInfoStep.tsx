"use client";
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Info, Lock, Globe, Hash, X } from 'lucide-react';
import slugify from 'slugify';

export function BasicInfoStep() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [tagInput, setTagInput] = useState("");
  
  const title = watch('title');
  const tags = watch('tags') || [];

  // Gerador automático de Slug
  useEffect(() => {
    if (title) {
      const generatedSlug = slugify(title, { lower: true, strict: true });
      setValue('slug', generatedSlug, { shouldValidate: true });
    }
  }, [title, setValue]);

  // Lógica de Tags
  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setValue('tags', [...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue('tags', tags.filter((t: string) => t !== tagToRemove));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Identidade do Evento</h2>
        <p className="text-slate-500 text-sm">Como o público encontrará seu evento na busca.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Título */}
        <div className="col-span-2 space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            Título do Evento <Info size={14} className="text-indigo-400" />
          </label>
          <input
            {...register('title')}
            placeholder="Ex: Saquá Summer Festival 2026"
            className={`w-full p-3 rounded-xl border ${errors.title ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm`}
          />
          {errors.title && <p className="text-xs text-red-500 font-medium">{errors.title.message as string}</p>}
        </div>

        {/* Slug Display */}
        <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">URL do Evento</label>
          <div className="flex items-center gap-1 text-slate-600 font-mono text-sm mt-1">
            <span className="opacity-50">aloha.com/</span>
            <span className="text-indigo-600 font-bold">{watch('slug') || "seu-evento"}</span>
          </div>
        </div>

        {/* Categoria */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Categoria</label>
          <select
            {...register('category')}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white outline-none appearance-none"
          >
            <option value="">Selecione...</option>
            <option value="PAGODE">Pagode</option>
            <option value="ELETRONICO">Eletrônico</option>
            <option value="SERTANEJO">Sertanejo</option>
            <option value="TEATRO">Teatro</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        {/* Classificação */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Classificação Etária</label>
          <select
            {...register('ageRating')}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white outline-none"
          >
            <option value="0">Livre</option>
            <option value="12">12 anos</option>
            <option value="16">16 anos</option>
            <option value="18">18 anos</option>
          </select>
        </div>

        {/* Descrição */}
        <div className="col-span-2 space-y-2">
          <label className="text-sm font-semibold text-slate-700">Descrição (SEO)</label>
          <textarea
            {...register('description')}
            rows={4}
            placeholder="Descreva a experiência do evento..."
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none shadow-sm"
          />
          <div className="flex justify-between">
             {errors.description && <p className="text-xs text-red-500">{errors.description.message as string}</p>}
             <span className="text-[10px] text-slate-400">Dica: Use palavras-chave como o nome da cidade e estilo musical.</span>
          </div>
        </div>

        {/* Tags */}
        <div className="col-span-2 space-y-3">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Hash size={14} /> Tags de Busca
          </label>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            placeholder="Digite uma tag e aperte Enter"
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => (
              <span key={tag} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                {tag} <X size={12} className="cursor-pointer" onClick={() => removeTag(tag)} />
              </span>
            ))}
          </div>
        </div>

        {/* Privacidade */}
        <div className="col-span-2 pt-4">
          <label className="text-sm font-semibold text-slate-700 mb-4 block">Visibilidade do Evento</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              onClick={() => setValue('isPrivate', false)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex gap-3 ${!watch('isPrivate') ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 opacity-60'}`}
            >
              <Globe className={!watch('isPrivate') ? 'text-indigo-600' : 'text-slate-400'} />
              <div>
                <p className="font-bold text-sm">Público</p>
                <p className="text-[10px] text-slate-500">Visível no feed e no Google.</p>
              </div>
            </div>

            <div 
              onClick={() => setValue('isPrivate', true)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex gap-3 ${watch('isPrivate') ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 opacity-60'}`}
            >
              <Lock className={watch('isPrivate') ? 'text-indigo-600' : 'text-slate-400'} />
              <div>
                <p className="font-bold text-sm">Privado</p>
                <p className="text-[10px] text-slate-500">Apenas via link direto.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}