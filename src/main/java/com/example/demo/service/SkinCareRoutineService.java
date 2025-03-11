package com.example.demo.service;

import com.example.demo.entity.SkinCareRoutine;
import com.example.demo.entity.SkinType;
import com.example.demo.dto.SkinCareRoutineRequest;
import com.example.demo.repository.SkinCareRoutineRepository;
import com.example.demo.repository.SkinTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkinCareRoutineService {

    @Autowired
    private SkinCareRoutineRepository skinCareRoutineRepository;

    @Autowired
    private SkinTypeRepository skinTypeRepository;

    public SkinCareRoutine createSkinCareRoutine(SkinCareRoutineRequest request) {
        SkinType skinType = skinTypeRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Skin type not found with ID: " + request.getProductId()));

        SkinCareRoutine routine = new SkinCareRoutine();
        routine.setSkinType(skinType);
        routine.setStepNumber(request.getStepNumber());
        routine.setDescription(request.getDescription());

        return skinCareRoutineRepository.save(routine);
    }

    public List<SkinCareRoutine> getAllSkinCareRoutines() {
        return skinCareRoutineRepository.findByIsDeletedFalse();
    }

    public SkinCareRoutine deleteSkinCareRoutine(long id) {
        SkinCareRoutine routine = skinCareRoutineRepository.findByRoutineIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Skin care routine not found with ID: " + id));
        routine.setDeleted(true);
        return skinCareRoutineRepository.save(routine);
    }

    public SkinCareRoutine updateSkinCareRoutine(long id, SkinCareRoutineRequest request) {
        SkinCareRoutine routine = skinCareRoutineRepository.findByRoutineIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Skin care routine not found with ID: " + id));

        SkinType skinType = skinTypeRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Skin type not found with ID: " + request.getProductId()));

        routine.setSkinType(skinType);
        routine.setStepNumber(request.getStepNumber());
        routine.setDescription(request.getDescription());

        return skinCareRoutineRepository.save(routine);
    }

    public List<SkinCareRoutine> getAllBySkinTypeId(long skinTypeId) {
        return skinCareRoutineRepository.findBySkinType_SkinTypeIdAndIsDeletedFalse(skinTypeId);
    }

    public SkinCareRoutine getSkinCareRoutineById(long skinCareRoutineId) {
        return skinCareRoutineRepository.findByRoutineIdAndIsDeletedFalse(skinCareRoutineId)
                .orElseThrow(() -> new RuntimeException("SkinCareRoutine not found"));
    }

}
