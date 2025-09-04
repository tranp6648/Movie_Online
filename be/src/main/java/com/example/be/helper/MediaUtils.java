package com.example.be.helper;

import com.example.be.Enum.MediaKind;
import com.example.be.entity.Media;
import com.example.be.repository.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Component
public class MediaUtils {
    @Autowired
    private MediaRepository mediaRepository;

    public Media save(MultipartFile file, String subDirectory, MediaKind kind) {
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String newFileName = UUID.randomUUID().toString() + extension;
            String uploadDir = System.getProperty("user.dir")
                    + "/src/main/resources/static/" + subDirectory;
            Path path = Paths.get(uploadDir);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
            Path filePath = path.resolve(newFileName);
            file.transferTo(filePath.toFile());
            Integer width = null;
            Integer height = null;
            try {
                BufferedImage image = ImageIO.read(file.getInputStream());
                if (image != null) {
                    width = image.getWidth();
                    height = image.getHeight();
                }
            } catch (Exception ignored) {
            }
            Media media = Media.builder()
                    .mediaKind(kind)
                    .url("/" + subDirectory + newFileName)
                    .alt(originalFilename)
                    .width(width)
                    .height(height)
                    .build();
            return mediaRepository.save(media);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
