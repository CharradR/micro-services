package tn.esprit.course.service;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import tn.esprit.course.entity.Module;

import java.util.List;

@Service
@Transactional
public class ModuleServiceImpl implements ModuleService {

    private final ModuleRepository moduleRepository;

    public ModuleServiceImpl(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    @Override
    public List<Module> getAllModules() {
        return moduleRepository.findAll();
    }

    @Override
    public Module getModuleById(Long id) {
        return moduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found with id " + id));
    }

    @Override
    public Module createModule(Module module) {
        return moduleRepository.save(module);
    }

    @Override
    public Module updateModule(Long id, Module updatedModule) {
        Module module = getModuleById(id);
        module.setTitle(updatedModule.getTitle());
        module.setCourse(updatedModule.getCourse()); // faire attention aux relations !
        return moduleRepository.save(module);
    }

    @Override
    public void deleteModule(Long id) {
        Module module = getModuleById(id);
        moduleRepository.delete(module);
    }
}
