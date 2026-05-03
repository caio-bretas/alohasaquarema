"use client";
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MapPin, Image as ImageIcon, Plus, Trash2, Map as MapIcon } from 'lucide-react';

export function LocationMediaStep() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [isFetchingCep, setIsFetchingCep] = useState(false);

  // Monitorar imagens para o preview
  const coverUrl = watch('coverImageUrl');
  const bannerUrl = watch('bannerImageUrl');
  const gallery = watch('galleryUrls') || [];

  // Busca automática de CEP
  const checkCEP = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length !== 8) return;

    setIsFetchingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setValue('address', `${data.logradouro}, ${data.bairro}`);
        setValue('city', data.localidade);
        setValue('state', data.uf);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP");
    } finally {
      setIsFetchingCep(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* SEÇÃO: LOCALIZAÇÃO */}
      <section className="space-y-6">
        <div className="border-b pb-4 flex items-center gap-2">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
            <MapIcon size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Onde será o evento?</h2>
            <p className="text-slate-500 text-sm">Informe o local para gerar o mapa para os clientes.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-4 space-y-2">
            <label className="text-sm font-semibold text-slate-700">Nome do Local (Ex: Espaço Aloha)</label>
            <input 
              {...register('venueName')}
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Nome da casa de shows, estádio, etc."
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-700">CEP</label>
            <input 
              {...register('zipCode')}
              onBlur={checkCEP}
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="00000-000"
            />
          </div>

          <div className="md:col-span-4 space-y-2">
            <label className="text-sm font-semibold text-slate-700">Endereço e Bairro</label>
            <input 
              {...register('address')}
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-1 space-y-2">
            <label className="text-sm font-semibold text-slate-700">Cidade</label>
            <input {...register('city')} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50" />
          </div>

          <div className="md:col-span-1 space-y-2">
            <label className="text-sm font-semibold text-slate-700">UF</label>
            <input {...register('state')} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50" />
          </div>
        </div>
      </section>

      {/* SEÇÃO: MÍDIA */}
      <section className="space-y-6">
        <div className="border-b pb-4 flex items-center gap-2">
          <div className="bg-pink-100 p-2 rounded-lg text-pink-600">
            <ImageIcon size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Visual do Evento</h2>
            <p className="text-slate-500 text-sm">Imagens de alta qualidade vendem mais ingressos.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cover Image (Quadrada/Retrato) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Capa do Evento (Card)</label>
            <div className={`h-64 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-all ${coverUrl ? 'border-none' : 'border-slate-300 hover:border-indigo-400'}`}>
              {coverUrl ? (
                <>
                  <img src={coverUrl} className="w-full h-full object-cover" alt="Cover" />
                  <button 
                    onClick={() => setValue('coverImageUrl', null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              ) : (
                <div className="text-center p-6">
                  <Plus className="mx-auto text-slate-400 mb-2" />
                  <p className="text-xs text-slate-500">Recomendado: 1000x1000px</p>
                  <input 
                    type="text" 
                    placeholder="URL da Imagem" 
                    onChange={(e) => setValue('coverImageUrl', e.target.value)}
                    className="mt-4 text-xs p-2 border rounded"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Banner Image (Widescreen) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Banner de Fundo (Página)</label>
            <div className={`h-64 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-all ${bannerUrl ? 'border-none' : 'border-slate-300 hover:border-indigo-400'}`}>
              {bannerUrl ? (
                <>
                  <img src={bannerUrl} className="w-full h-full object-cover" alt="Banner" />
                  <button 
                    onClick={() => setValue('bannerImageUrl', null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              ) : (
                <div className="text-center p-6">
                  <Plus className="mx-auto text-slate-400 mb-2" />
                  <p className="text-xs text-slate-500">Recomendado: 1920x1080px</p>
                  <input 
                    type="text" 
                    placeholder="URL da Imagem" 
                    onChange={(e) => setValue('bannerImageUrl', e.target.value)}
                    className="mt-4 text-xs p-2 border rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}