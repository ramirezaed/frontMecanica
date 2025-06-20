'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/Hook/use-toast';
import emailjs from 'emailjs-com';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Encabezado from '@/components/encabezado/encabezado';

// EmailJS Constants
const EMAILJS_SERVICE_ID = 'service_fhqqzti';
const EMAILJS_TEMPLATE_ID = 'template_7eukh6h';
const EMAILJS_PUBLIC_KEY = 'nunZ_ZZCQAnKeIafe';

export default function Consultas() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: 'ramirezaed@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: 'Mensaje enviado',
        description: 'Gracias por contactarme. Te responderé pronto.',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error al enviar el email:', error);
      toast({
        title: 'Error al enviar',
        description: 'Ha ocurrido un error. Intenta nuevamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-portfolio-purple" />,
      title: 'Email',
      value: 'mecanicaguemes@gmail.com',
    },
    {
      icon: <Phone className="h-6 w-6 text-portfolio-purple" />,
      title: 'Teléfono',
      value: '+54 379 4815033',
    },
    {
      icon: <MapPin className="h-6 w-6 text-portfolio-purple" />,
      title: 'Ubicación',
      value: 'Av. Independencia 5198. Argentina, Corrientes',
      link: 'https://www.google.com/maps/place/Av.+Independencia+5198',
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section>
      <Encabezado title="¿Consultas?" subtitle="No dudes en escribirnos" />

      {/* SECCIÓN MENSAJE CON ANIMACIONES */}
      <motion.div
        className="container mx-auto max-w-5xl px-4 mt-20"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-3 gap-10 ">
          <motion.div
            className="md:col-span-1 space-y-8"
            variants={itemVariants}
          >
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-4 mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  {item.link ? (
                    <a href={item.link} className="text-sm text-gray-600">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-600">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div className="md:col-span-2" variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-5 mb-28 bg-white rounded-lg shadow-md"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Tu email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-700"
                >
                  Asunto
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Asunto del mensaje"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700"
                >
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tu mensaje..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-gray-50 bg-gray-800 hover:bg-gray-700 flex items-center gap-2"
              >
                {isSubmitting ? (
                  'Enviando...'
                ) : (
                  <>
                    Enviar Mensaje <Mail className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
