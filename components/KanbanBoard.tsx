import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import axios from 'axios';
import { Lead, SaleStatus } from '../types';
import { Card, CardContent } from './ui/card';
import { 
  MoreVertical, 
  Phone, 
  Mail, 
  Calendar, 
  FileText,
  User,
  Zap,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface KanbanBoardProps {
  leads: Lead[];
  onLeadsUpdate: () => void;
  onEditLead: (lead: Lead) => void;
}

const COLUMNS = [
  { id: SaleStatus.NEW, title: 'Novos Leads', color: 'bg-blue-500', icon: Zap },
  { id: SaleStatus.WAITING_DOCS, title: 'Documentação', color: 'bg-amber-500', icon: FileText },
  { id: SaleStatus.SCHEDULED, title: 'Agendados', color: 'bg-indigo-500', icon: Calendar },
  { id: SaleStatus.ISSUED, title: 'Emitidos', color: 'bg-emerald-500', icon: CheckCircle2 },
  { id: SaleStatus.LOST, title: 'Perdidos', color: 'bg-slate-400', icon: AlertCircle },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ leads, onLeadsUpdate, onEditLead }) => {
  const [boardData, setBoardData] = useState<Record<string, Lead[]>>({});

  useEffect(() => {
    const organized: Record<string, Lead[]> = {};
    COLUMNS.forEach(col => {
      organized[col.id] = leads.filter(l => l.status === col.id);
    });
    setBoardData(organized);
  }, [leads]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;
    
    // Optimistic UI update
    const newBoardData = { ...boardData };
    const [movedItem] = newBoardData[sourceCol].splice(source.index, 1);
    newBoardData[destCol].splice(destination.index, 0, { ...movedItem, status: destCol as SaleStatus });
    setBoardData(newBoardData);

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/leads/${draggableId}/status`, {
        status: destCol
      });
      onLeadsUpdate();
    } catch (err) {
      console.error('Error updating lead status:', err);
      // Revert on error
      const revertedData = {};
      COLUMNS.forEach(col => {
        revertedData[col.id] = leads.filter(l => l.status === col.id);
      });
      setBoardData(revertedData);
      alert('Erro ao atualizar status. O lead voltou para a coluna original.');
    }
  };

  return (
    <div className="flex-1 overflow-x-auto bg-slate-50/50 p-6 h-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 min-w-max h-full">
          {COLUMNS.map(column => (
            <div key={column.id} className="w-80 flex flex-col h-full bg-slate-100/50 rounded-2xl border border-slate-200/60 p-4">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", column.color)} />
                  <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">{column.title}</h3>
                  <span className="bg-white px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-400 border border-slate-200">
                    {boardData[column.id]?.length || 0}
                  </span>
                </div>
                <column.icon className="w-4 h-4 text-slate-400" />
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "flex-1 overflow-y-auto space-y-3 min-h-[200px] transition-colors rounded-xl",
                      snapshot.isDraggingOver ? "bg-slate-200/50" : ""
                    )}
                  >
                    {boardData[column.id]?.map((lead, index) => (
                      <Draggable key={lead.id} draggableId={lead.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn(
                              "group transition-all",
                              snapshot.isDragging ? "rotate-2 scale-105 z-50" : ""
                            )}
                          >
                            <Card 
                              className="border-slate-200 hover:border-blue-300 hover:shadow-md cursor-grab active:cursor-grabbing transition-all bg-white"
                              onClick={() => onEditLead(lead)}
                            >
                              <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                    {lead.type}
                                  </span>
                                  <button className="text-slate-300 hover:text-slate-600">
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                                
                                <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                                  {lead.name}
                                </h4>

                                <div className="space-y-1.5 pt-2 border-t border-slate-50">
                                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                    <Phone className="w-3.5 h-3.5" />
                                    {lead.phone}
                                  </div>
                                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                    <User className="w-3.5 h-3.5" />
                                    {lead.origin}
                                  </div>
                                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                    <Clock className="w-3.5 h-3.5" />
                                    {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
